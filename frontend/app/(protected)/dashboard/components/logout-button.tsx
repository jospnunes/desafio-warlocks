import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {logoutApi} from "@/services/auth";

export default function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
        await logoutApi();
        toast({
            title: 'Logout efetuado com sucesso',
            description: 'Você será redirecionado para a página inicial.',
            variant: 'default',
        })
        router.push('/');
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      toast({
        title: 'Erro ao fazer logout',
        description: errorMessage || 'Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
