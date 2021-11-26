import React from 'react';
import { KeyboardAvoidingView, ViewStyle } from 'react-native';
import {
  AutocompleteDropdown,
  AutocompleteDropdownProps,
} from 'react-native-autocomplete-dropdown';
import Layout from '../../constants/Layout';

const CONTAINER: ViewStyle = {
  height: Layout.window.height * 0.13,
  maxHeight: Layout.window.height * 0.13,
};

export function GalleryFilter(props) {
  return (
    <KeyboardAvoidingView style={CONTAINER}>
      <AutocompleteDropdown />
    </KeyboardAvoidingView>
  );
}
