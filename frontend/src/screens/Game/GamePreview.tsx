import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { CategoryContent } from '../../types/category.type.ts';

interface GamePreviewProps {
  content: CategoryContent | undefined;
}

export const GamePreview = ({ content }: GamePreviewProps) => {
  return (
    content && (
      <Card sx={{ maxWidth: 500, textAlign: 'center', padding: 2 }}>
        {content.preview_img && (
          <CardMedia
            component="img"
            height="200"
            image={content.preview_img}
            alt={content.name}
          />
        )}
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {content.name}
          </Typography>
          <Typography variant="body1">{content.preview_desc}</Typography>
        </CardContent>
      </Card>
    )
  );
};
