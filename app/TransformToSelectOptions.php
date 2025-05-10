<?php

namespace App;

trait TransformToSelectOptions
{
    public function transformToSelectOptions(array $data, string $valueName, string $labelName) {
        $options = [];
        foreach ($data as $value) {
            $options[] = (Object)['value' => $value[$valueName], 'label' => $value[$labelName]];
        }
        return $options;
    }
}
