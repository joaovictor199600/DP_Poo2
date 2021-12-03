import { Container } from "./styles";
import { useEffect, useState } from 'react'
import api from '../../services/api'


interface EventsProps {
    id: string;
    nomeevento: string;
    local: string;
    diasemana: string;
    horario: string;
}

export function Dashboard(){
    const [eventos, setEventos] = useState<EventsProps[]>([])
    let like = 0
    let deslike = 0


    useEffect(() => {
        ListarEventos()
    }, [])
    
    async function ListarEventos() {
        const ListEventos = await api.get('/events')
        setEventos(ListEventos.data)
    }
    
    async function DeleteEventos(id: string) {
        await api.delete(`/events/${id}`)
        alert('Dados excluidos com sucesso!!')
        setEventos(eventos.filter(event => event.id !== id))
    }
    
    async function LikeDeslike(like: number, deslike: number) {
        if(like){
          like = like + 1
        }
        if(deslike){
          deslike = deslike + 1
        }
    }
    
    return(
        <Container>
        <ul>
          {eventos.map((event, index) =>
            <li key={index.toString()}>
              <h2>{event.nomeevento} - {event.local}</h2>
              <span>Evento: {event.nomeevento}</span>
              <span>Local: {event.local}</span>
              <span>Dia da semana: {event.diasemana}</span>
              <span>Horário: {event.horario}</span>
              <a href='/'><button type="button" onClick={() => DeleteEventos(event.id)}>Excluir</button></a>
              <button type="button" name='like' onClick={() => LikeDeslike}>Like - {like}</button>
              <button type="button" name='deslike' onClick={() => LikeDeslike}>Deslike - {deslike}</button>
            </li>
          )}
        </ul>
        </Container>
    )
}