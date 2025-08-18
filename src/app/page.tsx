/*
 * Código fuente desarrollado y compartido de forma gratuita por:
 * T O R R E N T E   D E V   S A S
 * -----------------------------------------------------------------
 * Casa de desarrollo de software en Colombia
 *
 * Este código se comparte bajo la licencia MIT.
 *
 * Agradecemos su interés en nuestro trabajo y esperamos que este
 * código le sea de gran utilidad.
 */
'use client';

import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

// --- Importaciones de Bootstrap ---
import { Form, Badge, Button as BootstrapButton, Card } from 'react-bootstrap';

// --- Importaciones de Material-UI (MUI) ---
import { TextField, Chip, Paper, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// --- Iconos (usaremos SVGs inline para simplicidad) ---
const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tag-fill" viewBox="0 0 16 16">
    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 3.5a.5.5 0 0 0-1 0v1.293l-1.146 1.147a.5.5 0 0 0 .708.708L6 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L7 7.793V6.5A.5.5 0 0 0 6.5 6z"/>
  </svg>
);

// Límite máximo de palabras/tags
const MAX_TAGS = 10;

// =================================================================
// Componente para la versión con Bootstrap
// =================================================================
const BootstrapTagInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [duplicateTag, setDuplicateTag] = useState<string | null>(null);
  const [tagToRemove, setTagToRemove] = useState<string | null>(null);
  const isLimitReached = tags.length >= MAX_TAGS;

  /**
   * Procesa el texto del input para extraer y añadir nuevos tags.
   */
  const processInput = (text: string) => {
    const potentialTags = text.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    
    let firstDuplicate: string | null = null;
    
    const newTags = potentialTags.filter(pt => {
      const isDuplicate = tags.includes(pt);
      if (isDuplicate && !firstDuplicate) {
        firstDuplicate = pt;
      }
      return !isDuplicate;
    });

    if (firstDuplicate) {
      setDuplicateTag(firstDuplicate);
      setTimeout(() => setDuplicateTag(null), 500);
    }

    if (newTags.length > 0) {
      const availableSlots = MAX_TAGS - tags.length;
      setTags(prevTags => [...prevTags, ...newTags.slice(0, availableSlots)]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(',')) {
      processInput(value);
      setInputValue('');
    } else {
      setInputValue(value);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      processInput(inputValue + ',');
      setInputValue('');
    }
  };
  
  /**
   * Inicia la animación de eliminación y luego elimina el tag del estado.
   * @param tagToRemoveValue El tag que se va a eliminar.
   */
  const removeTag = (tagToRemoveValue: string) => {
    setTagToRemove(tagToRemoveValue); // Activa la animación
    setTimeout(() => {
      setTags(prevTags => prevTags.filter(tag => tag !== tagToRemoveValue));
      setTagToRemove(null); // Resetea el estado de la animación
    }, 300); // Duración debe coincidir con la animación CSS
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="d-flex align-items-center mb-3">
          <TagIcon />
          <span className="ms-2">Campo de Tags (Bootstrap)</span>
        </Card.Title>
        <Card.Text>
          Escribe palabras y sepáralas con una coma (`,`) para agregarlas. También puedes pegar texto y presionar Enter.
        </Card.Text>
        <Form.Group>
          <Form.Label>Añadir hasta {MAX_TAGS} palabras:</Form.Label>
          <Form.Control
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={isLimitReached ? 'Límite alcanzado' : 'Escribe aquí...'}
            disabled={isLimitReached}
            aria-describedby="tag-helper"
          />
          <Form.Text id="tag-helper" muted>
            Palabras agregadas: {tags.length} / {MAX_TAGS}
          </Form.Text>
        </Form.Group>
        
        <div className="mt-3 p-3 bg-light rounded" style={{ minHeight: '100px' }}>
          {tags.length === 0 && <p className="text-muted small mb-0">Tus palabras aparecerán aquí.</p>}
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              pill 
              bg={tag === duplicateTag ? 'danger' : 'primary'} 
              className={`fs-6 me-2 mb-2 d-inline-flex align-items-center ${tag === duplicateTag ? 'shake-animation' : ''} ${tag === tagToRemove ? 'fade-out-shrink-animation' : ''}`}
            >
              {tag}
              <span 
                onClick={() => removeTag(tag)} 
                className="ms-2"
                style={{ cursor: 'pointer', fontWeight: 'bold' }}
                aria-label={`Eliminar ${tag}`}
              >
                &times;
              </span>
            </Badge>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

// =================================================================
// Componente para la versión con Material-UI
// =================================================================
const MaterialTagInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [duplicateTag, setDuplicateTag] = useState<string | null>(null);
  const [tagToRemove, setTagToRemove] = useState<string | null>(null);
  const isLimitReached = tags.length >= MAX_TAGS;

  const processInput = (text: string) => {
    const potentialTags = text.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    
    let firstDuplicate: string | null = null;
    
    const newTags = potentialTags.filter(pt => {
      const isDuplicate = tags.includes(pt);
      if (isDuplicate && !firstDuplicate) {
        firstDuplicate = pt;
      }
      return !isDuplicate;
    });

    if (firstDuplicate) {
      setDuplicateTag(firstDuplicate);
      setTimeout(() => setDuplicateTag(null), 500);
    }

    if (newTags.length > 0) {
      const availableSlots = MAX_TAGS - tags.length;
      setTags(prevTags => [...prevTags, ...newTags.slice(0, availableSlots)]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(',')) {
      processInput(value);
      setInputValue('');
    } else {
      setInputValue(value);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      processInput(inputValue + ',');
      setInputValue('');
    }
  };

  const removeTag = (tagToRemoveValue: string) => {
    setTagToRemove(tagToRemoveValue); // Activa la animación
    setTimeout(() => {
      setTags(prevTags => prevTags.filter(tag => tag !== tagToRemoveValue));
      setTagToRemove(null); // Resetea el estado de la animación
    }, 300); // Duración debe coincidir con la animación CSS
  };

  return (
    <Paper elevation={3} sx={{ padding: '2rem', borderRadius: '12px' }}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TagIcon />
        Campo de Tags (Material-UI)
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
        Escribe palabras y sepáralas con una coma (`,`) para agregarlas. También puedes pegar texto y presionar Enter.
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label={`Añadir hasta ${MAX_TAGS} palabras`}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={isLimitReached ? 'Límite alcanzado' : 'Escribe aquí...'}
        disabled={isLimitReached}
        helperText={`Palabras agregadas: ${tags.length} / ${MAX_TAGS}`}
      />
      <Box 
        sx={{ 
          marginTop: 2, 
          padding: 2, 
          minHeight: '100px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '8px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          alignContent: 'flex-start'
        }}
      >
        {tags.length === 0 && <Typography color="textSecondary" sx={{ fontStyle: 'italic' }}>Tus palabras aparecerán aquí.</Typography>}
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => removeTag(tag)}
            color={tag === duplicateTag ? 'error' : 'primary'}
            sx={{
              ...(tag === duplicateTag && { animation: 'shake 0.5s ease-in-out' }),
              ...(tag === tagToRemove && { animation: 'fade-out-shrink 0.3s ease-out forwards' })
            }}
          />
        ))}
      </Box>
    </Paper>
  );
};

// =================================================================
// Componente Principal que renderiza todo
// =================================================================
export default function HomePage() {
  const [view, setView] = useState<'bootstrap' | 'material'>('bootstrap');
  
  const muiTheme = createTheme({
    palette: {
      primary: { main: '#6200ea' },
      error: { main: '#d32f2f' },
    },
    typography: { fontFamily: 'Inter, sans-serif' },
    components: {
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 500 },
        },
      },
    },
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
        
        body {
          background-color: #f4f7f9;
          font-family: 'Inter', sans-serif;
          padding-top: 2rem;
        }

        /* Animación para duplicados */
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .shake-animation {
          animation: shake 0.5s ease-in-out;
        }

        /* Animación para eliminar */
        @keyframes fade-out-shrink {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.5);
          }
        }

        .fade-out-shrink-animation {
          animation: fade-out-shrink 0.3s ease-out forwards;
        }
      `}</style>

      <main className="container">
        <header className="text-center mb-5">
          <h1 className="display-5 fw-bold">Componente de Tags Dinámico</h1>
          <p className="lead text-muted">Una demostración con Bootstrap y Material-UI en Next.js</p>
        </header>

        <div className="d-flex justify-content-center mb-4 gap-2">
          <BootstrapButton 
            variant={view === 'bootstrap' ? 'primary' : 'outline-primary'}
            onClick={() => setView('bootstrap')}
          >
            Ver con Bootstrap
          </BootstrapButton>
          <BootstrapButton 
            variant={view === 'material' ? 'primary' : 'outline-primary'}
            onClick={() => setView('material')}
          >
            Ver con Material-UI
          </BootstrapButton>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            {view === 'bootstrap' ? (
              <BootstrapTagInput />
            ) : (
              <ThemeProvider theme={muiTheme}>
                <MaterialTagInput />
              </ThemeProvider>
            )}
          </div>
        </div>
        
        <footer className="text-center mt-5 text-muted">
            <p>Desarrollado por  <strong><a href='https://www.torrente.dev' target='_blank'>Torrente Dev SAS</a></strong> para demostrar la funcionalidad de un campo de tags avanzado.</p>
        </footer>
      </main>
    </>
  );
}
