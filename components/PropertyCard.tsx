
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { colors } from '../styles/commonStyles';
import Icon from './Icon';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // 20px padding on each side + 20px gap

interface Property {
  id: string;
  images: string[];
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  type: string;
}

interface PropertyCardProps {
  property: Property;
  isLastInRow?: boolean;
}

export default function PropertyCard({ property, isLastInRow = false }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  console.log('PropertyCard rendered for:', property.title);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const imageIndex = Math.round(scrollPosition / cardWidth);
    setCurrentImageIndex(imageIndex);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    console.log('Property liked:', property.title, !isLiked);
  };

  return (
    <View style={[styles.card, isLastInRow && styles.lastInRow]}>
      {/* Image Carousel */}
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.imageScrollView}
        >
          {property.images.map((imageUrl, index) => (
            <Image
              key={index}
              source={{ uri: imageUrl }}
              style={styles.propertyImage}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Like Button */}
        <TouchableOpacity
          style={styles.likeButton}
          onPress={toggleLike}
        >
          <Icon
            name={isLiked ? "heart" : "heart-outline"}
            size={20}
            color={isLiked ? colors.primary : colors.background}
          />
        </TouchableOpacity>

        {/* Image Indicators */}
        {property.images.length > 1 && (
          <View style={styles.indicators}>
            {property.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  {
                    backgroundColor: index === currentImageIndex 
                      ? colors.background 
                      : 'rgba(255, 255, 255, 0.5)'
                  }
                ]}
              />
            ))}
          </View>
        )}
      </View>

      {/* Property Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.locationRow}>
          <Text style={styles.location} numberOfLines={1}>
            {property.location}
          </Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={12} color={colors.star} />
            <Text style={styles.rating}>{property.rating}</Text>
          </View>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {property.title}
        </Text>

        <Text style={styles.type} numberOfLines={1}>
          {property.type}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${property.price}</Text>
          <Text style={styles.priceUnit}> night</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    marginBottom: 24,
  },
  lastInRow: {
    marginRight: 0,
  },
  imageContainer: {
    position: 'relative',
    height: cardWidth * 0.8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageScrollView: {
    flex: 1,
  },
  propertyImage: {
    width: cardWidth,
    height: '100%',
  },
  likeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicators: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
  detailsContainer: {
    paddingTop: 12,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    marginLeft: 2,
  },
  title: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
    lineHeight: 18,
  },
  type: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  priceUnit: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
