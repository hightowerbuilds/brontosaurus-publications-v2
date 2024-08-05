

export interface Message {
    id: string;
    userID: string;
    name: string;
    createdAt: Date;
    post: string;
    views: number;
    replies: number;
}