<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PurchaseOrderFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nomor' => ['required', 'string', 'max:255'],
            'supplier_id' => ['required', 'integer'],
            'product_id' => ['required', 'integer'],
            'purchase_date' => ['required', 'date'],
            'quantity' => ['required', 'integer'],
        ];
    }
}
