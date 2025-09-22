
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors } from '../styles/commonStyles';
import SimpleBottomSheet from './BottomSheet';
import Icon from './Icon';
import Button from './Button';

interface FilterBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function FilterBottomSheet({ isVisible, onClose }: FilterBottomSheetProps) {
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('');
  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(0);

  console.log('FilterBottomSheet rendered, visible:', isVisible);

  const priceRanges = [
    { id: '0-50', label: '$0 - $50', value: '0-50' },
    { id: '50-100', label: '$50 - $100', value: '50-100' },
    { id: '100-200', label: '$100 - $200', value: '100-200' },
    { id: '200+', label: '$200+', value: '200+' },
  ];

  const propertyTypes = [
    { id: 'apartment', label: 'Apartment', icon: 'business' },
    { id: 'house', label: 'House', icon: 'home' },
    { id: 'loft', label: 'Loft', icon: 'layers' },
    { id: 'studio', label: 'Studio', icon: 'square' },
  ];

  const handleApplyFilters = () => {
    console.log('Applying filters:', {
      priceRange: selectedPriceRange,
      propertyType: selectedPropertyType,
      guests: guestCount,
      bedrooms: bedroomCount,
    });
    onClose();
  };

  const handleClearFilters = () => {
    setSelectedPriceRange('');
    setSelectedPropertyType('');
    setGuestCount(1);
    setBedroomCount(0);
    console.log('Filters cleared');
  };

  const incrementCount = (type: 'guests' | 'bedrooms') => {
    if (type === 'guests') {
      setGuestCount(prev => Math.min(prev + 1, 16));
    } else {
      setBedroomCount(prev => Math.min(prev + 1, 8));
    }
  };

  const decrementCount = (type: 'guests' | 'bedrooms') => {
    if (type === 'guests') {
      setGuestCount(prev => Math.max(prev - 1, 1));
    } else {
      setBedroomCount(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClearFilters}>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Price Range */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price range</Text>
            <View style={styles.optionsGrid}>
              {priceRanges.map((range) => (
                <TouchableOpacity
                  key={range.id}
                  style={[
                    styles.optionButton,
                    selectedPriceRange === range.value && styles.selectedOption
                  ]}
                  onPress={() => setSelectedPriceRange(
                    selectedPriceRange === range.value ? '' : range.value
                  )}
                >
                  <Text style={[
                    styles.optionText,
                    selectedPriceRange === range.value && styles.selectedOptionText
                  ]}>
                    {range.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Property Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Property type</Text>
            <View style={styles.propertyTypesGrid}>
              {propertyTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.propertyTypeButton,
                    selectedPropertyType === type.id && styles.selectedPropertyType
                  ]}
                  onPress={() => setSelectedPropertyType(
                    selectedPropertyType === type.id ? '' : type.id
                  )}
                >
                  <Icon 
                    name={type.icon as any} 
                    size={24} 
                    color={selectedPropertyType === type.id ? colors.primary : colors.textSecondary} 
                  />
                  <Text style={[
                    styles.propertyTypeText,
                    selectedPropertyType === type.id && styles.selectedPropertyTypeText
                  ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Guests */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Guests</Text>
            <View style={styles.counterRow}>
              <Text style={styles.counterLabel}>Number of guests</Text>
              <View style={styles.counter}>
                <TouchableOpacity
                  style={[styles.counterButton, guestCount <= 1 && styles.disabledButton]}
                  onPress={() => decrementCount('guests')}
                  disabled={guestCount <= 1}
                >
                  <Icon name="remove" size={16} color={guestCount <= 1 ? colors.grey : colors.text} />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{guestCount}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => incrementCount('guests')}
                >
                  <Icon name="add" size={16} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Bedrooms */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bedrooms</Text>
            <View style={styles.counterRow}>
              <Text style={styles.counterLabel}>Number of bedrooms</Text>
              <View style={styles.counter}>
                <TouchableOpacity
                  style={[styles.counterButton, bedroomCount <= 0 && styles.disabledButton]}
                  onPress={() => decrementCount('bedrooms')}
                  disabled={bedroomCount <= 0}
                >
                  <Icon name="remove" size={16} color={bedroomCount <= 0 ? colors.grey : colors.text} />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{bedroomCount}</Text>
                <TouchableOpacity
                  style={styles.counterButton}
                  onPress={() => incrementCount('bedrooms')}
                >
                  <Icon name="add" size={16} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            text="Show properties"
            onPress={handleApplyFilters}
            style={styles.applyButton}
            textStyle={styles.applyButtonText}
          />
        </View>
      </View>
    </SimpleBottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  clearText: {
    fontSize: 16,
    color: colors.textSecondary,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  selectedOptionText: {
    color: colors.background,
  },
  propertyTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  propertyTypeButton: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  selectedPropertyType: {
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.primary,
  },
  propertyTypeText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  selectedPropertyTypeText: {
    color: colors.primary,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterLabel: {
    fontSize: 16,
    color: colors.text,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  disabledButton: {
    opacity: 0.5,
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    minWidth: 24,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  applyButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
  },
  applyButtonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});
