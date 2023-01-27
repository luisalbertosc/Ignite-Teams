import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Alert, FlatList } from 'react-native';

import { GroupsContainer } from "./styles";
import { Loading } from '@components/Loading';

import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from '@components/ListEmpty';
import { Highlight } from "@components/Highlight";
import { Header } from "@components/Header";
import { Button } from '@components/Button';


export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation()

  function handleOpenGroup(group: string){
    navigation.navigate('players', {group})
  }

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const data = await groupsGetAll();
      setGroups(data);

    } catch (error) {
      Alert.alert('Turmas', 'Não foi possível carregar as turmas');
      console.log(error)
    } finally {
      setIsLoading(false);
    } 
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []))

  return (

    <GroupsContainer>
      <Header />
      <Highlight
        title="Turmas"
        subtitle="jogue com sua turma"
      />
      {
        isLoading ? <Loading /> :
          <FlatList 
            data={groups}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <GroupCard 
                title={item}
                onPress={() => handleOpenGroup(item)}
              />
            )}
            contentContainerStyle={groups.length === 0 && { flex: 1 }}
            ListEmptyComponent={() => (
              <ListEmpty message="Que tal cadastrar a primeira turma?" />
            )}
          />
      }

      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </GroupsContainer>
  );
}