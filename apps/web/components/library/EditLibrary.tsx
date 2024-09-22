import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addLibrary, Library } from "@/api/library"
import { toast } from "../ui/use-toast"

interface EditLibraryDialogProps {
  onLibraryEdited: () => void;
}

export default function EditLibraryDialog({ onLibraryEdited }: EditLibraryDialogProps){
  const [open, setOpen] = useState(false)
  const [sentence, setSentence] = useState("")
  const [hint, setHint] = useState("")
}