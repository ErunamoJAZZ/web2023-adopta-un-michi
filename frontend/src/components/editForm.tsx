import React, { useState, useEffect } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, FormControl, Select, MenuItem, InputLabel, Box} from '@mui/material';

function EditForm({ initialData, open, onSave, onClose, fields }) {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    if (open) {
      setFormData(initialData);
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value,});
    

  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>   

        {fields.map((field) => {
          switch (field.type) {
            case 'select':
              return (
                <FormControl
                fullWidth={true}
                >
                  <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value= {formData[field.name] || ''}
                    label={`${field.label}`}
                    name={`${field.name}`}
                    onChange={handleChange}
                  >
                    {field.options.map((option) => (
                      <MenuItem value={option}>{`${option}`}</MenuItem>
                    ))}
                  </Select>

                </FormControl>
              );
          default: return (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              value={formData[field.name] || ''}
              onChange={handleChange} 
            />
          );
        }
        } )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditForm;