import React from 'react';
import Button from './ui/Button';
import Input from './ui/Input';
import { Mail } from "lucide-react";

const NewSletterForm = () => {
  return (
    <form action="">
      <label htmlFor="newsletter-input" className="flex-grow bg-background text-foreground rounded-full flex items-center space-x-3 h-10.5 md:h-12 px-4 mb-3 md:mb-3.5">
        <Mail strokeWidth={2.25} className="text-muted-foreground" />
        <Input type="email" id="newsletter-input" placeholder="Enter your email address..." />
      </label>
      <Button type="submit" variant="outline" size="sm" className="text-sm">Subscribe to Newsletter</Button>
    </form>
  )
}

export default NewSletterForm;