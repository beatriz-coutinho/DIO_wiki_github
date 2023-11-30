import gitLogo from '../assets/logo-github.png'
import { Container } from './styles';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo'
import { useState } from 'react';
import Button from '../components/Button';
import { api } from '../services/api';

function App() {

  const [repos, setRepos] = useState([]);
  const [currentRepo, setCurrentRepo] = useState('')

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    if (data.id) {
      const isExist = repos.find(repo => repo.id === data.id)

      if (!isExist) {
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
      }
    } else {
      alert("Repositório não encontrado");
    }
  }

  const handleRemoveRepo = (id) => {
    let newArray = repos.filter(item => item.id !== id)
    setRepos(newArray)
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="Logo GitHub" />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}
    </Container>
  );
}

export default App;
