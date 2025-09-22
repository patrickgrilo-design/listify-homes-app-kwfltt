import React, { useState } from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet,
  Dimensions 
} from 'react-native';
import { colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleBottomSheet from '../components/BottomSheet';
import Icon from '../components/Icon';
import PropertyCard from '../components/PropertyCard';
import FilterBottomSheet from '../components/FilterBottomSheet';

const { width } = Dimensions.get('window');

// Mock data for property listings
const mockProperties = [
  {
    id: '1',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400'
    ],
    title: 'Modern Apartment in Downtown',
    location: 'New York, NY',
    price: 120,
    rating: 4.8,
    reviewCount: 127,
    type: 'Entire apartment'
  },
  {
    id: '2',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'
    ],
    title: 'Cozy Studio Near Central Park',
    location: 'New York, NY',
    price: 85,
    rating: 4.6,
    reviewCount: 89,
    type: 'Private room'
  },
  {
    id: '3',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'
    ],
    title: 'Luxury Loft with City Views',
    location: 'Brooklyn, NY',
    price: 200,
    rating: 4.9,
    reviewCount: 203,
    type: 'Entire loft'
  },
  {
    id: '4',
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400'
    ],
    title: 'Charming Brownstone',
    location: 'Manhattan, NY',
    price: 150,
    rating: 4.7,
    reviewCount: 156,
    type: 'Entire house'
  },
  {
    id: '5',
    images: [
      'https://images.unsplash.com/photo-1582063289852-62e3ba2747f8?w=400',
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400'
    ],
    title: 'Minimalist Design Apartment',
    location: 'Queens, NY',
    price: 95,
    rating: 4.5,
    reviewCount: 74,
    type: 'Entire apartment'
  },
  {
    id: '6',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400'
    ],
    title: 'Spacious Family Home',
    location: 'Staten Island, NY',
    price: 180,
    rating: 4.8,
    reviewCount: 92,
    type: 'Entire house'
  }
];

export default function MainScreen() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  console.log('MainScreen rendered');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Search */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Where are you going?"
            placeholderTextColor={colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Filter Bar */}
      <View style={styles.filterBar}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setIsFilterVisible(true)}
          >
            <Icon name="options" size={16} color={colors.text} />
            <Text style={styles.filterText}>Filters</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Dates</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Guests</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Price</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Type</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Property Listings */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.propertiesGrid}>
          {mockProperties.map((property, index) => (
            <PropertyCard 
              key={property.id} 
              property={property}
              isLastInRow={index % 2 === 1}
            />
          ))}
        </View>
        
        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
  },
  filterBar: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterScrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
  },
  propertiesGrid: {
    paddingHorizontal: 20,
    paddingTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bottomPadding: {
    height: 20,
  },
});
