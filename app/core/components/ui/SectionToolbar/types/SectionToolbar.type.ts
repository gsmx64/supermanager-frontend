export type SectionToolbarProps = {
  count: number;
  swapView: boolean;
  setSwapView: (value: boolean) => void;
  CreateButton?: React.ComponentType<any>;
  CreateButtonProps?: any;
}
