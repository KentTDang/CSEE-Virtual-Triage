import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@workspace/ui/components/ui/shadcn-io/ai/source";

type Source = {
  title: string;
  url: string;
  chunk_index: number;
};

interface ChatbotSourcesProp {
  sources: Source[];
}

export const ChatbotSources = ({ sources }: ChatbotSourcesProp) => {
  console.log("Chatbot Sources: ", sources);
  return (
    <div className="pt-8">
      <Sources>
        <SourcesTrigger count={sources.length} />
        <SourcesContent>
          {sources.map((source) => (
            <Source href={source.url} key={source.url} title={source.title} />
          ))}
        </SourcesContent>
      </Sources>
    </div>
  );
};
