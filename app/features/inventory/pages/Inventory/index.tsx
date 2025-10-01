import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Select, SelectItem, type Selection } from "@heroui/react";

import SectionTitle from "@/core/components/ui/SectionTitle";
import { Spinner } from "@/core/components/ui/Spinner";
import LocationIcon from "@/features/inventory/components/icons/LocationIcon";
import LocationZoneIcon from "@/features/inventory/components/icons/LocationZoneIcon";
import DeviceIcon from "@/features/inventory/components/icons/DeviceIcon";
import useLocationsStore from "@/features/inventory/state/stores/locations.store";
import LeafletMapWithClusters from "@/core/components/ui/LeafletMapWithClusters";
import type { Route } from ".react-router/types/app/features/inventory/pages/Inventory/+types/index";


type CardProps = React.PropsWithChildren<{
  style?: React.CSSProperties;
  onClick?: () => void;
}>;

function Card({ children, style, onClick }: CardProps) {
  return (
    <div
      className={`border-indigo-100 dark:border-indigo-900 border-2 rounded-xl shadow transition-colors hover:shadow-2xl hover:bg-primary-200 dark:hover:bg-primary-950 p-0 ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = React.PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
}>;

function CardHeader({ children, className, style }: CardHeaderProps) {
  return (
    <div
      className={`px-5 pt-4 pb-2 border-b border-indigo-100 dark:border-indigo-900 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

type CardContentProps = React.PropsWithChildren<{
  style?: React.CSSProperties;
}>;

function CardContent({ children, style }: CardContentProps) {
  return (
    <div
      className="px-5 pb-4 pt-2"
      style={style}
    >
      {children}
    </div>
  );
}


export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation();
  return [
    { title: t('inventory.title') },
    { name: 'description', content: t('inventory.description') },
  ];
}


export default function Inventory() {
  const { t } = useTranslation();
  const [locationSelected, setLocationSelected] = useState<Set<string>>(new Set([]));
  const locations = useLocationsStore((state) => state.locations);
  const fetchLocations = useLocationsStore((state) => state.fetchLocations);
  const loading = useLocationsStore((state) => state.loading);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    fetchLocations(1, 999, 'title');
    setIsClient(true);
  }, []);

  const sections = [
    {
      key: "locations_zones",
      title: t("inventory.location-zones-title"),
      icon: <LocationZoneIcon width="1.2rem" height="1.2rem" className="ml-1" />,
      description: t("inventory.location-zones-description"),
      link: "/inventory/locationzones",
    },
    {
      key: "locations",
      title: t("inventory.locations-title"),
      icon: <LocationIcon width="1.2rem" height="1.2rem" className="ml-1" />,
      description: t("inventory.locations-description"),
      link: "/inventory/locations",
    },
    {
      key: "devices_at_location",
      title: t("inventory.devices-by-location-title"),
      icon: <DeviceIcon width="1.2rem" height="1.2rem" className="ml-1" />,
      description: t("inventory.devices-by-location-description"),
      link: "/inventory/location/",
    },
  ];

  const navigate = useNavigate();
  const redirectToSection = (sectionKey: string, locationId?: number) => {
    const section = sections.find((sec) => sec.key === sectionKey);
    if (section) {
      if (section.key === "devices_at_location") {
        navigate(section.link + locationId);
      } else {
        navigate(section.link);
      }
    }
  };

  return (
    <>
      <SectionTitle
        title={t('inventory.title')}
        description={t('inventory.description')}
      />
      <div className="flex gap-8 min-h-[500px]">
        <div className="w-2/5 min-w-[320px] flex flex-col gap-4">
          {sections.map((section) => (
            <Card
              key={section.key}
              style={{
                transition: "all 0.2s",
              }}
              onClick={
                (section.key !== "devices_at_location" && locations.length > 0) ?
                () => redirectToSection(section.key) :
                undefined
              }
            >
              <CardHeader className="flex items-center gap-3 font-semibold text-lg">
                <span
                  className="mr-3 text-lg text-red-600 dark:text-red-500"
                >
                  {section.icon}
                </span>
                <span
                  className="font-semibold text-lg text-blue-700 dark:text-blue-300"
                >
                  {section.title}
                </span>
              </CardHeader>
              <CardContent>
                <span className="text-gray-900 dark:text-gray-100 text-sm">{section.description}</span>
                {(section.key === "devices_at_location" && locations.length > 0) && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Select
                      name="location"
                      description={t('inventory.form-select-location-to-view-description')}
                      label={t('inventory.table-location')}
                      placeholder={t('common.form-select-field', { field: t('inventory.table-location') })}
                      selectedKeys={locationSelected}
                      variant="bordered"
                      className="min-w-[200px] max-w-xs"
                      startContent={<LocationIcon width="1.2rem" height="1.2rem" className="ml-1" />}
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0];
                        setLocationSelected(new Set(Array.from(keys as Selection).map(String)));

                        // Get the selected location by id and set its title in the form
                        const selectedLocation = locations.find(
                          (location) => String(location.id) === String(selectedKey)
                        );
                        redirectToSection(section.key, selectedLocation?.id);
                      }}
                    >
                      {locations.map((locationZone) => (
                        <SelectItem
                          key={locationZone.id}
                          textValue={locationZone.title}
                        >
                          <div className="flex gap-2 items-center">
                            <LocationIcon width="1.2rem" height="1.2rem" className="ml-1" /> {locationZone.title}
                          </div>
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex-1 min-h-[500px] rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
          {(isClient) ? (
            <LeafletMapWithClusters
              center={[-40.5,-64.95]}
              markers={
                locations.map(
                  (loc) => ({
                    index: loc.id ?? 0,
                    position: [loc.latitude ?? 0, loc.longitude ?? 0],
                    title: loc.title,
                    address: loc.address,
                  })
                )
              }
              zoom={4}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
              options={{
                zoomControl: true,
                attributionControl: false,
                minZoom: 2,
              }}
            />
          ) : <Spinner />}
        </div>
      </div>
    </>
  );
}