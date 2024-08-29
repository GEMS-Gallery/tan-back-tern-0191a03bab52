import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { backend } from 'declarations/backend';

type FormData = {
  url: string;
};

const App: React.FC = () => {
  const [preview, setPreview] = useState<{ title: string; screenshotUrl: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // In a real application, you would use a library to fetch the preview
      // For this example, we'll simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const title = 'Example Website';
      const screenshotUrl = 'https://example.com/screenshot.jpg';
      
      await backend.saveLinkPreview(data.url, title, screenshotUrl);
      setPreview({ title, screenshotUrl });
    } catch (error) {
      console.error('Error fetching preview:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Link Previewer
      </Typography>
      <img
        src="https://images.unsplash.com/photo-1524901548305-08eeddc35080?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ5NzAyNjZ8&ixlib=rb-4.0.3"
        alt="Website preview"
        style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '2rem' }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="url"
          control={control}
          defaultValue=""
          rules={{ required: 'URL is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Enter URL"
              variant="outlined"
              fullWidth
              error={!!error}
              helperText={error?.message}
              InputProps={{
                endAdornment: (
                  <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : 'Preview'}
                  </Button>
                ),
              }}
            />
          )}
        />
      </form>
      {preview && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {preview.title}
            </Typography>
            <img
              src={preview.screenshotUrl}
              alt="Website preview"
              style={{ width: '100%', height: 'auto' }}
            />
          </CardContent>
        </Card>
      )}
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
        Image by <a href="https://unsplash.com/photos/and-breathe-neon-sign-on-tre-buymYm3RQ3U" target="_blank" rel="noopener noreferrer">Unsplash</a>
      </Typography>
    </Container>
  );
};

export default App;
