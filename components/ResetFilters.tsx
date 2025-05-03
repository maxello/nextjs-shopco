"use client";
import { ListRestart } from 'lucide-react';
import React from 'react'
import Button from './ui/Button';

const ResetFilters = ({
  onResetFilters
}: {
  onResetFilters: () => void
}) => {
  return (
    <Button aria-label="Reset Filters" onClick={onResetFilters} className="h-8 w-8 md:h-7 md:w-7 p-0 bg-destructive border-destructive hover:bg-destructive/80 hover:border-destructive/80 active:border-destructive/80 active:bg-destructive/80">
      <ListRestart />
    </Button>
  )
}

export default ResetFilters