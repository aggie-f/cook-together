import { useFieldArray, useForm } from 'react-hook-form'
import type { RecipeFormValues } from '../../types/recipe'

type StepField = { text: string }

type InternalFormValues = Omit<RecipeFormValues, 'steps'> & {
  steps: StepField[]
}

interface RecipeFormProps {
  defaultValues?: Partial<RecipeFormValues>
  submitLabel?: string
  onSubmit: (values: RecipeFormValues) => void
}

export const RecipeForm = ({
  defaultValues,
  submitLabel = 'Save recipe',
  onSubmit,
}: RecipeFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InternalFormValues>({
    defaultValues: {
      title: defaultValues?.title ?? '',
      image: defaultValues?.image ?? '',
      ingredients: defaultValues?.ingredients?.length
        ? defaultValues.ingredients
        : [{ name: '', quantity: undefined, unit: '', notes: '' }],
      steps: defaultValues?.steps?.length
        ? defaultValues.steps.map((s) => ({ text: s }))
        : [{ text: '' }],
    },
    mode: 'onSubmit',
  })

  const ingredientsArray = useFieldArray({
    control,
    name: 'ingredients',
  })

  const stepsArray = useFieldArray({
    control,
    name: 'steps',
  })

  return (
    <form
      className="mt-6 space-y-10"
      onSubmit={handleSubmit((vals) => {
        const formValues: RecipeFormValues = {
          ...vals,
          steps: vals.steps.map((s) => s.text.trim()).filter(Boolean),
        }
        onSubmit(formValues)
      })}
    >
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-slate-900">
          Title
        </label>
        <input
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
          {...register('title', { required: 'Title is required' })}
          placeholder="e.g. Creamy Garlic Pasta"
        />
        {errors.title ? (
          <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
        ) : null}
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium text-slate-900">
          Image URL (optional)
        </label>
        <input
          className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
          {...register('image')}
          placeholder="https://..."
        />
      </div>

      {/* Ingredients */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Ingredients</h2>

          <button
            type="button"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            onClick={() =>
              ingredientsArray.append({
                name: '',
                quantity: undefined,
                unit: '',
                notes: '',
              })
            }
          >
            + Add ingredient
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {ingredientsArray.fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border border-slate-200 p-4"
            >
              <div className="grid gap-3 sm:grid-cols-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-900">
                    Name
                  </label>
                  <input
                    className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
                    {...register(`ingredients.${index}.name`, {
                      required: 'Ingredient name is required',
                    })}
                    placeholder="e.g. pasta"
                  />
                  {errors.ingredients?.[index]?.name ? (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.ingredients[index]?.name?.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900">
                    Qty (optional)
                  </label>
                  <input
                    type="number"
                    step="any"
                    className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
                    {...register(`ingredients.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    placeholder="e.g. 200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900">
                    Unit (optional)
                  </label>
                  <select
                    className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
                    {...register(`ingredients.${index}.unit`)}
                    defaultValue=""
                  >
                    <option value="">—</option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="tsp">tsp</option>
                    <option value="tbsp">tbsp</option>
                    <option value="cup">cup</option>
                    <option value="pcs">pcs</option>
                  </select>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium text-slate-900">
                    Notes (optional)
                  </label>
                  <input
                    className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
                    {...register(`ingredients.${index}.notes`)}
                    placeholder="e.g. finely chopped"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  onClick={() => ingredientsArray.remove(index)}
                  disabled={ingredientsArray.fields.length === 1}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Steps</h2>

          <button
            type="button"
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            onClick={() => stepsArray.append({ text: '' })}
          >
            + Add step
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {stepsArray.fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border border-slate-200 p-4"
            >
              <label className="block text-sm font-medium text-slate-900">
                Step {index + 1}
              </label>
              <textarea
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"
                rows={3}
                {...register(`steps.${index}.text`, {
                  required: 'Step text is required',
                })}
                placeholder="Describe the step..."
              />
              {errors.steps?.[index]?.text ? (
                <p className="mt-2 text-sm text-red-600">
                  {errors.steps[index]?.text?.message}
                </p>
              ) : null}

              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  onClick={() => stepsArray.remove(index)}
                  disabled={stepsArray.fields.length === 1}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
