
import './App.css'
import { useState, useEffect } from 'react';
import OpenAI from 'openai';
import ReactMarkdown from 'react-markdown';

const App = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const openai = new OpenAI({
      apiKey: "r8_L06EsUFh0W50dj6ANgrjPJxBaTZC3uh1ojLlO",
      dangerouslyAllowBrowser: true,
    });

    const fetchUICriticResponse = async () => {
      setIsLoading(true);
      try {
        const result = await openai.chat.completions.create({
          model: "gpt-4-vision-preview",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "You're an expert UI critic. What can I improve in this website?" },
                {
                  type: "image_url",
                  image_url: {
                    "url": "https://i.ibb.co/sWM573X/Screenshot-2024-01-18-at-10-34-28-AM.png",
                  },
                },
              ],
            },
          ],
          "max_tokens": 1500
        });
        if (result && result.choices && result.choices.length > 0 && result.choices[0].message) {
          console.log(1, result);
          setResponse(result.choices[0].message.content);
        }
      } catch (error) {
        console.error("Error fetching AI response:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUICriticResponse();
  }, []);

  return (
    <div>
      <h3>Hi! UI Expert Here</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : response ? (
        <div>
          <h3>My Feedback:</h3>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      ) : (
        <p>No response received.</p>
      )}
    </div>
  );
};

export default App;