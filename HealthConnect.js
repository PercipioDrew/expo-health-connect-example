import {
    getSdkStatus,
    SdkAvailabilityStatus,
    initialize,
    requestPermission,
    readRecords,
} from 'react-native-health-connect';

const checkAvailability = async () => {
    const status = await getSdkStatus();
    if (status === SdkAvailabilityStatus.SDK_AVAILABLE) {
        console.log('SDK is available');
    }

    if (status === SdkAvailabilityStatus.SDK_UNAVAILABLE) {
        console.log('SDK is not available');
    }

    if (
        status === SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED
    ) {
        console.log('SDK is not available, provider update required');
    }
};

export const readHealthConnectSteps = async () => {
    // initialize the client
    const isInitialized = await initialize();
    console.log('Health Connect isInitialized', isInitialized);

    await checkAvailability();

    // request permissions
    const grantedPermissions = await requestPermission([
        { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
        { accessType: 'read', recordType: 'Steps' },
        { accessType: 'read', recordType: 'SleepSession' },
    ]);
    console.log('grantedPermissions', grantedPermissions);

    if (!grantedPermissions?.length) {
        console.log('No permissions were granted');
        return;
    }
    console.log('Permission granted', grantedPermissions);

    const isStepsPermissionGranted = grantedPermissions.find((p) => p.recordType === 'Steps');

    if (!isStepsPermissionGranted) {
        console.log('Steps permission was not granted');
        return;
    };

    try {
        const { records } = await readRecords('Steps', {
            timeRangeFilter: {
                operator: 'between',
                startTime: '2024-09-03T19:16:57.223Z',
                endTime: '2024-09-05T19:16:57.223Z',
            },
        });
        console.log('records', records);
        const count = records?.map((record) => record.count).reduce((a, b) => a + b, 0);
        console.log('count', count);
    } catch (error) {
        console.error('could not call readRecords', error);
    }
};
