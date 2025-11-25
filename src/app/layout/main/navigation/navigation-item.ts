export interface NavigationItem {
    id: string;
    title: string;
    type: 'item' | 'collapse' | 'group';
    translate?: string;
    icon?: string;
    hidden?: boolean;
    url?: string;
    classes?: string;
    exactMatch?: boolean;
    external?: boolean;
    target?: boolean;
    breadcrumbs?: boolean;
  
    children?: NavigationItem[];
  }
  export const NavigationItems: NavigationItem[] = [
    {
      id: 'azure-services',
      title: 'Azure Services',
      type: 'group',
      icon: 'icon-pages',
      children: [
        {
          id: 'web-job',
          title: 'Web Job',
          type: 'item',
          url: '/web-job',
          icon: 'feather icon-watch',
          classes: 'nav-item'
        },
        {
          id: 'blob-storage',
          title: 'Blob Storage',
          type: 'item',
          url: '/blob-storage',
          icon: 'feather icon-upload-cloud',
          classes: 'nav-item'
        }
      ]
    }
  ];
  