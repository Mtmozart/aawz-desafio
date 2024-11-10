import axios from "axios";

export async function findByCep(cep: string) {
  try {
    return await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
  } catch (error) {
    console.error('Erro ao consultar o CEP:', error);
  }

}