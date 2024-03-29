import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import { styles } from "./styles";

import { Participant } from "../../components/Participant";

import React, { useState } from "react";

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert("Já existe!!!!!!", "Insira um novo");
    }

    setParticipants((prevState) => [...prevState, participantName]);
    setParticipantName("");

    console.log(participants);
    console.log("Você cliclou no botão de Adicionar!");
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((participantName) => participantName !== name)
          ),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
    console.log(`Você clicou em romover o participante ${name} `);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>APPLIST </Text>

      <Text style={styles.eventDate}>Sexta, 4 Agosto 2023</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Participante"
          placeholderTextColor="#6b6b6b"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmpyText}>
            Ninguem chegou ainda ? Adicione.
          </Text>
        )}
      />
    </View>
  );
}
