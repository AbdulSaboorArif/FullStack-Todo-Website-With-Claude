export type Citation = {
  title: string;
  detail?: string;
  icon?: string;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  tag?: string;
  createdAt: number;
};
