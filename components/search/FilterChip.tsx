import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface FilterChipProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
  style?: any;
}

const FilterChip: React.FC<FilterChipProps> = ({
  title,
  isActive,
  onPress,
  style,
}) => {
  return (
    <Pressable
      style={[
        styles.chip,
        isActive && styles.chipActive,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.chipText,
        isActive && styles.chipTextActive,
      ]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  chipActive: {
    backgroundColor: '#003580',
    borderColor: '#003580',
  },
  chipText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  chipTextActive: {
    color: '#fff',
  },
});

export default FilterChip; 