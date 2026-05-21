import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
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
};

const CODE_LENGTH = 6;

export function VerificationCodeModal({
  visible,
  email,
  onClose,
}: VerificationCodeModalProps) {
  const router = useRouter();
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

  useEffect(() => {
    if (code.length !== CODE_LENGTH) {
      return;
    }

    onClose();
    router.replace("/");
  }, [code, onClose, router]);

  const handleClose = () => {
    setCode("");
    onClose();
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
            <Pressable onPress={handleClose} hitSlop={12}>
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

          <Pressable
            onPress={focusCodeInput}
            style={styles.codeInputWrapper}
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
              onChangeText={(text) =>
                setCode(text.replace(/\D/g, "").slice(0, CODE_LENGTH))
              }
              keyboardType="number-pad"
              inputMode="numeric"
              maxLength={CODE_LENGTH}
              caretHidden
              showSoftInputOnFocus
              style={styles.codeInput}
            />
          </Pressable>
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
});
