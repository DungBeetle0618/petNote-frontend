import React, { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  View,
  Animated,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { MODAL_COLORS } from '../../assets/styles/globalStyles';

export default function BottomModal({ visible, onClose, title, children, maxHeight }) {
  const [translateY] = useState(new Animated.Value(400));

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : 400,
      duration: visible ? 250 : 200,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      	<Pressable style={styles.overlay} onPress={onClose} />
		<Animated.View style={[styles.sheetContainer, { height: maxHeight, transform: [{ translateY }], maxHeight }]}>
		<ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
			{title && <Text style={styles.title}>{title}</Text>}
			<View>{children}</View>
		</ScrollView>
		</Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: MODAL_COLORS.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: MODAL_COLORS.primary,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -6 },
    shadowRadius: 12,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 18,
  },
});
