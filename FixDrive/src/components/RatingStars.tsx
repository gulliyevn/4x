import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { lightColors, darkColors } from '../constants/colors';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showText?: boolean;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 16,
  showText = true,
}) => {
  const { theme } = useTheme();
  const colors = theme === 'dark' ? darkColors : lightColors;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      const isFilled = i <= rating;
      const starColor = isFilled ? '#FFD700' : colors.border;
      
      stars.push(
        <Text key={i} style={[styles.star, { fontSize: size, color: starColor }]}>
          ★
        </Text>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>
      {showText && (
        <Text style={[styles.ratingText, { color: colors.text }]}>
          {rating.toFixed(1)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    marginRight: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RatingStars; 