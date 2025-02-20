import {api} from './api';

export interface Note {
  id: string;
  title: string;
  description: string;
}

export async function createNoteApi(title: string, description: string): Promise<Note> {
  try {
    const response = await api.post('/notes', { title, description });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Erro ao criar nota. Tente novamente.');
  }
}

export async function getNotesApi(): Promise<Note[]> {
  try {
    const response = await api.get('/notes');
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Erro ao buscar notas. Tente novamente.');
  }
}

export async function updateNoteApi(noteId: string, title: string, description: string): Promise<Note> {
  try {
    const response = await api.put(`/notes/${noteId}`, { title, description });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Erro ao atualizar nota. Tente novamente.');
  }
}

export async function deleteNoteApi(noteId: string): Promise<{ message: string }> {
  try {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Erro ao excluir nota. Tente novamente.');
  }
}