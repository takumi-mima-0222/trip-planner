import { useFieldArray, Control } from 'react-hook-form';
import { PlanCreateInput } from '../planCreate.type';

/**
 * スポット配列の追加・削除を管理するカスタムフック
 * 最小1件を担保（削除時に1件以下にならないようにする）
 */
export const usePlanSpots = (control: Control<PlanCreateInput>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'spots',
  });

  /** スポットを追加（空の value） */
  const addSpot = () => {
    append({ value: '' });
  };

  /** スポットを削除（最小1件を保持） */
  const removeSpot = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  /** 削除ボタンを無効化すべきかどうか */
  const canRemove = fields.length > 1;

  return {
    fields,
    addSpot,
    removeSpot,
    canRemove,
  };
};
