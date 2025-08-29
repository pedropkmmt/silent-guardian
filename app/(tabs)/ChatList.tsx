import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Modal,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const isSmallScreen = screenWidth < 375;
const isTablet = screenWidth > 768;

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  unreadCount: number;
  type: 'contact' | 'group';
  phoneNumber?: string;
  isEmergencyContact?: boolean;
  members?: string[];
}

interface ChatListProps {
  onSelectChat: (chat: Chat) => void;
}

const ChatListPage: React.FC<ChatListProps> = ({ onSelectChat }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [chats, setChats] = useState<Chat[]>([]);
  
  // Modal and form states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTypeSelector, setShowTypeSelector] = useState(true);
  const [selectedType, setSelectedType] = useState<'contact' | 'group' | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    isEmergencyContact: false,
    members: [''], // For group members
  });

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: '',
      phoneNumber: '',
      isEmergencyContact: false,
      members: [''],
    });
    setSelectedType(null);
    setShowTypeSelector(true);
  };

  // Handle add button press
  const handleAddPress = () => {
    setShowAddModal(true);
    resetForm();
  };

  // Handles type selection
  const handleTypeSelect = (type: 'contact' | 'group') => {
    setSelectedType(type);
    setShowTypeSelector(false);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter a name');
      return;
    }
    
    if (selectedType === 'contact' && !formData.phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }

    if (selectedType === 'group' && formData.members.filter(m => m.trim()).length < 1) {
      Alert.alert('Error', 'Please add at least one member');
      return;
    }

    const newChat: Chat = {
      id: Date.now().toString(),
      name: formData.name,
      lastMessage: selectedType === 'contact' ? 'New contact added' : 'New group created',
      timestamp: 'Just now',
      avatar: selectedType === 'contact' ? '👤' : '👥',
      unreadCount: 0,
      type: selectedType,
      ...(selectedType === 'contact' && {
        phoneNumber: formData.phoneNumber,
        isEmergencyContact: formData.isEmergencyContact,
      }),
      ...(selectedType === 'group' && {
        members: formData.members.filter(m => m.trim()),
      }),
    };

    setChats([...chats, newChat]);
    setShowAddModal(false);
    resetForm();
  };

  // add member inputs for groups
  const addMemberInput = () => {
    setFormData({
      ...formData,
      members: [...formData.members, ''],
    });
  };

  // Remove member input
  const removeMemberInput = (index: number) => {
    const newMembers = formData.members.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      members: newMembers.length > 0 ? newMembers : [''],
    });
  };

  // Update member 
  const updateMember = (index: number, value: string) => {
    const newMembers = [...formData.members];
    newMembers[index] = value;
    setFormData({
      ...formData,
      members: newMembers,
    });
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => onSelectChat(item)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Text style={styles.avatar}>{item.avatar}</Text>
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        
        <View style={styles.messageContainer}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {/* Show emergency badge for emergency contacts */}
          {item.isEmergencyContact && (
            <View style={[styles.unreadBadge, styles.emergencyBadge]}>
              <Text style={styles.emergencyText}>🚨</Text>
            </View>
          )}
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>
                {item.unreadCount > 99 ? '99+' : item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Empty page with ni contacts or groups
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>💬</Text>
      <Text style={styles.emptyTitle}>No messages yet</Text>
      <Text style={styles.emptySubtitle}>
        Start a conversation by adding a contact or creating a group
      </Text>
      <TouchableOpacity style={styles.emptyAddButton} onPress={handleAddPress}>
        <Text style={styles.emptyAddText}>Add Contact or Group</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        {/* Updated add button */}
        <TouchableOpacity style={styles.newChatButton} onPress={handleAddPress}>
          <Text style={styles.newChatIcon}>➕</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar for when if there are chats */}
      {chats.length > 0 && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#8E8E93"
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>
      )}

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={renderEmptyState}
      />

      {/* Add Contact/Group  */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                setShowAddModal(false);
                resetForm();
              }}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>
              {showTypeSelector ? 'Add New' : selectedType === 'contact' ? 'New Contact' : 'New Group'}
            </Text>
            
            {!showTypeSelector && (
              <TouchableOpacity onPress={handleSubmit} style={styles.saveButton}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.modalContent}>
            {/* Type Selector */}
            {showTypeSelector ? (
              <View style={styles.typeSelectorContainer}>
                <TouchableOpacity
                  style={styles.typeOption}
                  onPress={() => handleTypeSelect('contact')}
                >
                  <Text style={styles.typeIcon}>👤</Text>
                  <Text style={styles.typeTitle}>New Contact</Text>
                  <Text style={styles.typeSubtitle}>Add an individual contact</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.typeOption}
                  onPress={() => handleTypeSelect('group')}
                >
                  <Text style={styles.typeIcon}>👥</Text>
                  <Text style={styles.typeTitle}>New Group</Text>
                  <Text style={styles.typeSubtitle}>Create a group chat</Text>
                </TouchableOpacity>
              </View>
            ) : (
              /* form */
              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    {selectedType === 'contact' ? 'Contact Name' : 'Group Name'}
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    value={formData.name}
                    onChangeText={(text) => setFormData({...formData, name: text})}
                    placeholder={selectedType === 'contact' ? 'Enter contact name' : 'Enter group name'}
                  />
                </View>

                {/* Contact-specific fields */}
                {selectedType === 'contact' && (
                  <>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Phone Number</Text>
                      <TextInput
                        style={styles.textInput}
                        value={formData.phoneNumber}
                        onChangeText={(text) => setFormData({...formData, phoneNumber: text})}
                        placeholder="Enter phone number"
                        keyboardType="phone-pad"
                      />
                    </View>

                    <TouchableOpacity
                      style={styles.emergencyToggle}
                      onPress={() => setFormData({
                        ...formData,
                        isEmergencyContact: !formData.isEmergencyContact
                      })}
                    >
                      <Text style={styles.emergencyLabel}>Emergency Contact</Text>
                      <View style={[
                        styles.toggleSwitch,
                        formData.isEmergencyContact && styles.toggleSwitchActive
                      ]}>
                        <View style={[
                          styles.toggleThumb,
                          formData.isEmergencyContact && styles.toggleThumbActive
                        ]} />
                      </View>
                    </TouchableOpacity>
                  </>
                )}

                {/* Group-specific fields */}
                {selectedType === 'group' && (
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Group Members</Text>
                    {formData.members.map((member, index) => (
                      <View key={index} style={styles.memberInputContainer}>
                        <TextInput
                          style={[styles.textInput, styles.memberInput]}
                          value={member}
                          onChangeText={(text) => updateMember(index, text)}
                          placeholder={`Member ${index + 1} name`}
                        />
                        {formData.members.length > 1 && (
                          <TouchableOpacity
                            onPress={() => removeMemberInput(index)}
                            style={styles.removeMemberButton}
                          >
                            <Text style={styles.removeMemberText}>✕</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                    <TouchableOpacity onPress={addMemberInput} style={styles.addMemberButton}>
                      <Text style={styles.addMemberText}>+ Add Member</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 32 : 20,
    paddingVertical: isSmallScreen ? 12 : 16,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: isTablet ? 32 : isSmallScreen ? 24 : 28,
    fontWeight: '700',
    color: '#000',
  },
  newChatButton: {
    width: isTablet ? 44 : 40,
    height: isTablet ? 44 : 40,
    borderRadius: isTablet ? 22 : 20,
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  newChatIcon: {
    fontSize: isTablet ? 20 : 18,
    color: '#FFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: isTablet ? 32 : 20,
    marginVertical: isSmallScreen ? 12 : 16,
    backgroundColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: isSmallScreen ? 8 : 12,
  },
  searchInput: {
    flex: 1,
    fontSize: isTablet ? 18 : 16,
    color: '#000',
    paddingVertical: 0,
  },
  searchIcon: {
    fontSize: isTablet ? 18 : 16,
    marginLeft: 8,
  },
  chatList: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 32 : 20,
    paddingVertical: isSmallScreen ? 12 : 16,
    backgroundColor: '#FFF',
  },
  avatarContainer: {
    width: isTablet ? 56 : 48,
    height: isTablet ? 56 : 48,
    borderRadius: isTablet ? 28 : 24,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: isSmallScreen ? 12 : 16,
  },
  avatar: {
    fontSize: isTablet ? 24 : 20,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  timestamp: {
    fontSize: isTablet ? 14 : 12,
    color: '#8E8E93',
    marginLeft: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: isTablet ? 16 : 14,
    color: '#8E8E93',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#1DA1F2',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#FFF',
    fontSize: isTablet ? 12 : 10,
    fontWeight: '600',
  },
  // 🟡 Emergency contact badge
  emergencyBadge: {
    backgroundColor: '#FF3B30',
    marginRight: 6,
  },
  emergencyText: {
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: isTablet ? 88 : 76,
  },
  // 🟡 Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  emptyAddButton: {
    backgroundColor: '#1DA1F2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  emptyAddText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // 🟡 Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    backgroundColor: '#FFF',
  },
  cancelButton: {
    padding: 4,
  },
  cancelText: {
    color: '#1DA1F2',
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  saveButton: {
    padding: 4,
  },
  saveText: {
    color: '#1DA1F2',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
  },
  // 🟡 Type selector styles
  typeSelectorContainer: {
    padding: 20,
  },
  typeOption: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  typeIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  typeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  typeSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  // 🟡 Form styles
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  emergencyToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
  },
  emergencyLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E5E5EA',
    padding: 2,
    justifyContent: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: '#34C759',
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },
  memberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  memberInput: {
    flex: 1,
    marginBottom: 0,
  },
  removeMemberButton: {
    marginLeft: 12,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeMemberText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  addMemberButton: {
    backgroundColor: '#E5E5EA',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addMemberText: {
    color: '#1DA1F2',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ChatListPage;