import { Separator } from "@workspace/ui/components/separator"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"


export const Header = () => {
    return (
        <header className="z-50 h-16">
            <div className="relative flex h-full items-center gap-3 p-4 sm:gap-4">
                <SidebarTrigger variant='outline' className='max-md:scale-125'/>
                <Separator orientation='vertical' className='h-6' />
                UMBC CSEE Virtual Triage
            </div>
        </header>
    )
} 