import { notifications } from "../store";
import { get } from 'svelte/store'
import { generateRandomId } from "./almostRandom";

export const removeNotification = (id): void => {
    if(!id) {return}
    let updatedNotifications = get(notifications).filter((notification) => 
        notification.id !== id
    );
    notifications.set(updatedNotifications);
}

interface Note {
    type: string,
    text: string,
    id: string
}

export const addNotification = (type, text): Note => {
    let newNote: Note = {
        type,
        text,
        id: generateRandomId()
    }
    notifications.set([...get(notifications), newNote]);
    return newNote;
}

export const newNotification = (type, text): void => {
    let newNote = addNotification(type, text);
    setTimeout(() => removeNotification(newNote.id), 3000);
}