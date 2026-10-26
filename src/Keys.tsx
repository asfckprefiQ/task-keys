import { useState, KeyboardEvent } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState<IItem[]>(props.initialData);

    const sortedItems = [...items].sort((a, b) =>
        props.sorting === 'ASC' ? a.id - b.id : b.id - a.id
    );

    function saveName(id: number, name: string) {
        setItems(items.map((item) => (item.id === id ? { ...item, name } : item)));
    }

    return (
        <div>
            {sortedItems.map((item) => (
                <Item key={item.id} item={item} onSave={saveName} />
            ))}
        </div>
    );
}

function Item(props: { item: IItem; onSave: (id: number, name: string) => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(props.item.name);

    function startEditing() {
        setValue(props.item.name);
        setIsEditing(true);
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            props.onSave(props.item.id, value);
            setIsEditing(false);
        } else if (event.key === 'Escape') {
            setValue(props.item.name);
            setIsEditing(false);
        }
    }

    if (isEditing) {
        return (
            <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
            />
        );
    }

    return <div onClick={startEditing}>{props.item.name}</div>;
}