import { MailPlus, UserPlus } from 'lucide-react'
import { Button } from "@workspace/ui/components/button";

export function FAQAddButton() {
    return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        // onClick={() => setOpen('invite')}
      >
        <span>Invite User</span> <MailPlus size={18} />
      </Button>
      <Button className='space-x-1'>
        <span>Add User</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}