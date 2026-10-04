import {View, Text, TextInput, StyleSheet} from 'react-native';
import {colors, spacing, fontSizes} from '../theme';

interface InputProps {
    label: string;
    value: string;
    onChangeText: (texto: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
}

export default function Input({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false }: InputProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                autoCapitalize="none"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
    },
    label: {
        fontSize: fontSizes.normal,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    input: {
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        padding: spacing.sm,
        fontSize: fontSizes.normal,
    },
});
