export interface CreateFormItem {
    id: string;
    type: 'checkbox' | 'text' | 'number';
    placeholder?: string;

    onChange: (value: string | number | boolean) => void;
    value?: string | number | boolean;
    title: string;
}