import React, { createContext, useContext, useState } from 'react';

const ContactContext = createContext();

export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
};

export const ContactProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openContact = () => setIsOpen(true);
  const closeContact = () => setIsOpen(false);
  const toggleContact = () => setIsOpen((prev) => !prev);

  return (
    <ContactContext.Provider value={{ isOpen, openContact, closeContact, toggleContact }}>
      {children}
    </ContactContext.Provider>
  );
};
