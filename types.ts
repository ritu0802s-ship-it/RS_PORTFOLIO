
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Strategy' | 'Marketing' | 'Management' | 'Technical';
}
