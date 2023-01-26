import { useState } from 'react';

import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupsContainer } from "./styles";
import { ListEmpty } from '@components/ListEmpty';

import { FlatList } from 'react-native';
import { Button } from '@components/Button';


export function Groups() {
  const [groups, setGroups] = useState<string[]>(["Galera do baba", "Galera da NFL"]);

  return (

    <GroupsContainer>
      <Header />
      <Highlight 
        title="Turmas"
        subtitle="jogue com sua turma"
      />
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            title={item} 
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />

      <Button
      title='Criar nova turma'
      />
    </GroupsContainer>
  );
}