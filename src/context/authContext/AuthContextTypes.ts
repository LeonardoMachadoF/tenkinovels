export interface ContextType {
    username: string;
    role: 'ADMIN' | 'UPLOADER' | 'USER'

}

export interface ChildrenType {
    children: React.ReactNode
}