'use client'
import { addProduct } from '@/app/cart/_actions/addproduct.action'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export default function ProductitemBtn({ id, className }: { id: string; className?: string }) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success('Product added to cart')
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: () => {
      toast.error('Log in first')
    },
  })

  return (
    <div>
      <Button
        onClick={() => mutate(id)}
        className={className ?? 'my-3'}
        disabled={isPending}
      >
        {isPending ? 'Adding…' : 'Add To Cart'}
      </Button>
    </div>
  )
}
