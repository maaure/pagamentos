import { Point } from "../fakeApi";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface PointFormProps {
  point?: Point;
  onSubmit: (point: Omit<Point, "id">) => void;
  onClose: () => void;
}

const pointSchema = yup.object({
  nome: yup
    .string()
    .required("O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres"),
  descricao: yup
    .string()
    .required("A descrição é obrigatória")
    .max(100, "A descrição não pode exceder 100 caracteres"),
  valor: yup
    .number()
    .required("O valor é obrigatório")
    .typeError("O valor deve ser numérico")
    .positive("O valor deve ser positivo"),
  localization: yup.string().required("A localização é obrigatória"),
  badges: yup.string().optional(),
});

export const PointForm = ({ point, onSubmit, onClose }: PointFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(pointSchema),
    defaultValues: {},
  });

  const submit = (data: any) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <aside className="h-screen flex flex-col p-6 gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {point ? "Editar Pagamento" : "Novo Pagamento"}
        </h2>
        <button
          className="btn btn-circle text-black"
          type="button"
          onClick={onClose}
        >
          <i className="fa-solid fa-xmark" />
        </button>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex-1 flex flex-col gap-6"
      >
        <div className="space-y-4 flex-1">
          <Input
            placeholder="Nome do pagamento"
            label="Nome"
            {...register("nome")}
            errors={errors}
          />

          <Input
            placeholder="Diga algo sobre esse pagamento"
            label="Descrição"
            {...register("descricao")}
            errors={errors}
          />

          <Input
            placeholder="Digite o valor desse pagamento"
            label="Valor"
            type="number"
            step="0.01"
            {...register("valor")}
            errors={errors}
          />

          <Input
            placeholder="Procure pelo lugar onde este pagamento foi feito"
            label="Localização"
            {...register("localization")}
            errors={errors}
          />

          <Input
            placeholder="Escolha as etiquetas desse pagamento"
            label="Etiquetas"
            {...register("badges")}
            errors={errors}
          />
        </div>

        <button type="submit" className="w-full btn btn-primary">
          Salvar
        </button>
      </form>
    </aside>
  );
};
