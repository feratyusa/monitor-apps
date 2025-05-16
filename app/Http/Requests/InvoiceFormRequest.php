<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InvoiceFormRequest extends FormRequest
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
            'purchase_order_id' => ['required', 'integer'],
            'invoice_date' => ['required', 'date'],
            'due_date' => ['required', 'date'],
            'tax' => ['required', 'integer'],
            'bank' => ['required', 'string', 'max:255'],
            'payment_status' => ['required', 'boolean'],
            'delivery_date' => ['required', 'date'],
        ];
    }
}
