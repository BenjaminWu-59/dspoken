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

interface CreateLibraryDialogProps {
  onLibraryCreated: () => void;
}

export default function CreateLibraryDialog({ onLibraryCreated }: CreateLibraryDialogProps) {
  const [open, setOpen] = useState(false)
  const [sentence, setSentence] = useState("")
  const [hint, setHint] = useState("")

  const queryClient = useQueryClient()

  const createLibraryMutation = useMutation({
    mutationFn: addLibrary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['libraries'] })
      setOpen(false)
      setSentence("")
      setHint("")
      onLibraryCreated()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newLibrary: Partial<Library> = {
      sentence,
      hint,
      classId: "cm0qfjrbp000112wuvhgdgyi3"
    }
    createLibraryMutation.mutate(newLibrary)

    toast({
      variant:"success",
      title: "创建成功！",
      duration: 1500
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">创建知识</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>创建新的知识条目</DialogTitle>
          <DialogDescription>
            在这里填写新的知识条目的详细信息。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sentence" className="text-right">
                句子
              </Label>
              <Input
                id="sentence"
                value={sentence}
                onChange={(e) => setSentence(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hint" className="text-right">
                提示
              </Label>
              <Input
                id="hint"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={createLibraryMutation.isPending}>
              {createLibraryMutation.isPending ? "创建中..." : "创建"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}