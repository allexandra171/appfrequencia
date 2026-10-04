import {Pressable, Text, StyleSheet} from 'react-native';
import {colors, spacing, fontSizes} from '../theme';

interface BotaoProps {
    titulo: string;
    onPress: () => void;
    cor?: string;
}

export default function Botao({
    titulo,
    onPress,
    cor = colors.primary,
}: BotaoProps) {
    return (
        <Pressable
            style={[styles.botao, { backgroundColor: cor }]}
            onPress={onPress}
        >
            <Text style={styles.texto}>{titulo}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botao: {
        padding: spacing.md,
        borderRadius: 8,
        alignItems: 'center',
    },
    texto: {
        color: colors.card,
        fontSize: fontSizes.normal,
        fontWeight: 'bold',
    },
});
