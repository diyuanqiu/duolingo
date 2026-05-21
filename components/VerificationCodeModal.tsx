import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  InteractionManager,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type VerificationCodeModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
  onVerify: (code: string) => Promise<boolean>;
  onResend?: () => Promise<void>;
  loading?: boolean;
  error?: string | null;
};

const CODE_LENGTH = 6;

export function VerificationCodeModal({
  visible,
  email,
  onClose,
  onVerify,
  onResend,
  loading = false,
  error = null,
}: VerificationCodeModalProps) {
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState("");

  const focusCodeInput = useCallback(() => {
    InteractionManager.runAfterInteractions(() => {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    });
  }, []);

  useEffect(() => {
    if (!visible) {
      setCode("");
      return;
    }

    const timer = setTimeout(focusCodeInput, Platform.OS === "ios" ? 400 : 250);
    return () => clearTimeout(timer);
  }, [visible, focusCodeInput]);

  const handleClose = () => {
    setCode("");
    onClose();
  };

  const handleCodeChange = async (text: string) => {
    const nextCode = text.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(nextCode);

    if (nextCode.length !== CODE_LENGTH || loading) {
      return;
    }

    const success = await onVerify(nextCode);
    if (success) {
      setCode("");
      onClose();
    } else {
      setCode("");
      focusCodeInput();
    }
  };

  const digits = Array.from({ length: CODE_LENGTH }, (_, index) =>
    code[index] ? code[index] : ""
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
      onShow={focusCodeInput}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={insets.bottom}
      >
        <Pressable style={styles.backdrop} onPress={handleClose} />

        <View
          style={[
            styles.sheet,
            { paddingBottom: Math.max(insets.bottom, 24) },
          ]}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="h3">Verify your email</Text>
            <Pressable onPress={handleClose} hitSlop={12} disabled={loading}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </Pressable>
          </View>

          <Text className="body-sm mb-6">
            We sent a 6-digit code to{" "}
            <Text className="font-poppins-semibold text-text-primary">
              {email}
            </Text>
            . Enter it below to continue.
          </Text>

          {error ? (
            <Text className="body-sm mb-4 text-[#E84B3B]">{error}</Text>
          ) : null}

          <Pressable
            onPress={focusCodeInput}
            style={styles.codeInputWrapper}
            disabled={loading}
          >
            <View className="flex-row justify-between gap-2" pointerEvents="none">
              {digits.map((digit, index) => (
                <View
                  key={index}
                  style={[
                    styles.digitBox,
                    digit ? styles.digitBoxFilled : undefined,
                    index === code.length ? styles.digitBoxActive : undefined,
                  ]}
                >
                  <Text className="font-poppins-semibold text-xl text-text-primary">
                    {digit}
                  </Text>
                </View>
              ))}
            </View>

            <TextInput
              ref={inputRef}
              value={code}
              onChangeText={handleCodeChange}
              keyboardType="number-pad"
              inputMode="numeric"
              maxLength={CODE_LENGTH}
              caretHidden
              showSoftInputOnFocus
              editable={!loading}
              style={styles.codeInput}
            />
          </Pressable>

          {loading ? (
            <ActivityIndicator color="#7B61FF" style={styles.loader} />
          ) : null}

          {onResend ? (
            <Pressable
              onPress={onResend}
              disabled={loading}
              className="mt-2 items-center py-2"
            >
              <Text className="font-poppins-semibold text-sm text-lingua-purple">
                Resend code
              </Text>
            </Pressable>
          ) : null}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  codeInputWrapper: {
    marginBottom: 16,
    minHeight: 48,
  },
  codeInput: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
    fontSize: 16,
    color: "transparent",
  },
  digitBox: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  digitBoxFilled: {
    borderColor: "#7B61FF",
  },
  digitBoxActive: {
    borderColor: "#7B61FF",
    borderWidth: 2,
  },
  loader: {
    marginBottom: 8,
  },
});
