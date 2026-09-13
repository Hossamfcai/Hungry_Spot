import { Paper, Group, Box, Table, Skeleton } from "@mantine/core";
const ThemeSkeleton = ({ style, ...props }) => (
  <Skeleton
    {...props}
    style={{
      "--skeleton-bg": "var(--color-surface-container-high)",
      "--skeleton-color": "var(--color-surface-container-highest)",
      ...style,
    }}
  />
);

export default function UsersTableSkeleton() {
  return (
    <Paper
      radius="lg"
      p="var(--spacing-space-lg)"
      style={{
        backgroundColor: "var(--color-surface-container-lowest)",
        borderColor: "var(--color-outline-variant)",
        boxShadow: "var(--shadow-candlelight)",
        fontFamily: "var(--font-sans)",
      }}
      withBorder
    >
      {/* 1. Header & Actions Skeleton */}
      <Group
        justify="space-between"
        align="flex-start"
        mb="var(--spacing-space-lg)"
      >
        {/* Title & Description Skeleton */}
        <Box style={{ flex: 1 }}>
          <ThemeSkeleton height={24} width={240} mb={8} radius="sm" />
          <ThemeSkeleton height={14} width={380} radius="sm" />
        </Box>

        {/* Dropdown Filter & Add Button Skeletons */}
        <Group gap="var(--spacing-space-sm)">
          <ThemeSkeleton height={36} width={130} radius="md" />
          <ThemeSkeleton height={36} width={110} radius="md" />
        </Group>
      </Group>

      {/* 2. Table Skeleton Container */}
      <Table.ScrollContainer minWidth={700}>
        <Table
          verticalSpacing="var(--spacing-space-sm)"
          style={{
            borderColor: "var(--color-outline-variant)",
          }}
        >
          {/* Table Header Column Skeletons */}
          <Table.Thead>
            <Table.Tr
              style={{
                borderBottom: "1px solid var(--color-outline-variant)",
              }}
            >
              <Table.Th>
                <ThemeSkeleton height={14} width={60} radius="sm" />
              </Table.Th>
              <Table.Th>
                <ThemeSkeleton height={14} width={50} radius="sm" />
              </Table.Th>
              <Table.Th>
                <ThemeSkeleton height={14} width={100} radius="sm" />
              </Table.Th>
              <Table.Th>
                <ThemeSkeleton height={14} width={90} radius="sm" />
              </Table.Th>
              <Table.Th style={{ textAlign: "right" }}>
                <Group justify="flex-end">
                  <ThemeSkeleton height={14} width={60} radius="sm" />
                </Group>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>

          {/* Table Rows Skeleton Body */}
          <Table.Tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <Table.Tr
                key={`table-skeleton-row-${index}`}
                style={{
                  borderBottom: "1px solid rgba(85, 67, 54, 0.4)", // --color-outline-variant with opacity
                }}
              >
                {/* User Column: Avatar + Name + Email */}
                <Table.Td>
                  <Group gap="var(--spacing-space-sm)" wrap="nowrap">
                    <ThemeSkeleton height={40} circle shrink={0} />
                    <Box style={{ width: "100%" }}>
                      <ThemeSkeleton
                        height={14}
                        width="55%"
                        mb={6}
                        radius="xl"
                      />
                      <ThemeSkeleton height={12} width="80%" radius="xl" />
                    </Box>
                  </Group>
                </Table.Td>

                {/* Role Column */}
                <Table.Td>
                  <ThemeSkeleton height={22} width={65} radius="full" />
                </Table.Td>

                {/* Account Status Column */}
                <Table.Td>
                  <ThemeSkeleton height={22} width={85} radius="full" />
                </Table.Td>

                {/* Last Activity Column */}
                <Table.Td>
                  <ThemeSkeleton height={14} width={110} radius="xl" />
                </Table.Td>

                {/* Row Action Buttons Column */}
                <Table.Td>
                  <Group gap={6} justify="flex-end" wrap="nowrap">
                    <ThemeSkeleton height={28} width={28} radius="md" />
                    <ThemeSkeleton height={28} width={28} radius="md" />
                    <ThemeSkeleton height={28} width={28} radius="md" />
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      {/* 3. Footer Counter Skeleton */}
      <Box
        pt="var(--spacing-space-md)"
        mt="var(--spacing-space-xs)"
        style={{
          borderTop: "1px solid var(--color-outline-variant)",
        }}
      >
        <ThemeSkeleton height={16} width={190} radius="sm" />
      </Box>
    </Paper>
  );
}
